package com.dinogroup.web.rest;

import com.dinogroup.TriSilkApp;

import com.dinogroup.domain.HoaDonBanHang;
import com.dinogroup.repository.HoaDonBanHangRepository;
import com.dinogroup.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.dinogroup.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HoaDonBanHangResource REST controller.
 *
 * @see HoaDonBanHangResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TriSilkApp.class)
public class HoaDonBanHangResourceIntTest {

    private static final LocalDate DEFAULT_NGAY_BAN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NGAY_BAN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TONG_TIEN_HD = "AAAAAAAAAA";
    private static final String UPDATED_TONG_TIEN_HD = "BBBBBBBBBB";

    @Autowired
    private HoaDonBanHangRepository hoaDonBanHangRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHoaDonBanHangMockMvc;

    private HoaDonBanHang hoaDonBanHang;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HoaDonBanHangResource hoaDonBanHangResource = new HoaDonBanHangResource(hoaDonBanHangRepository);
        this.restHoaDonBanHangMockMvc = MockMvcBuilders.standaloneSetup(hoaDonBanHangResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HoaDonBanHang createEntity(EntityManager em) {
        HoaDonBanHang hoaDonBanHang = new HoaDonBanHang()
            .ngayBan(DEFAULT_NGAY_BAN)
            .tongTienHD(DEFAULT_TONG_TIEN_HD);
        return hoaDonBanHang;
    }

    @Before
    public void initTest() {
        hoaDonBanHang = createEntity(em);
    }

    @Test
    @Transactional
    public void createHoaDonBanHang() throws Exception {
        int databaseSizeBeforeCreate = hoaDonBanHangRepository.findAll().size();

        // Create the HoaDonBanHang
        restHoaDonBanHangMockMvc.perform(post("/api/hoa-don-ban-hangs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHang)))
            .andExpect(status().isCreated());

        // Validate the HoaDonBanHang in the database
        List<HoaDonBanHang> hoaDonBanHangList = hoaDonBanHangRepository.findAll();
        assertThat(hoaDonBanHangList).hasSize(databaseSizeBeforeCreate + 1);
        HoaDonBanHang testHoaDonBanHang = hoaDonBanHangList.get(hoaDonBanHangList.size() - 1);
        assertThat(testHoaDonBanHang.getNgayBan()).isEqualTo(DEFAULT_NGAY_BAN);
        assertThat(testHoaDonBanHang.getTongTienHD()).isEqualTo(DEFAULT_TONG_TIEN_HD);
    }

    @Test
    @Transactional
    public void createHoaDonBanHangWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hoaDonBanHangRepository.findAll().size();

        // Create the HoaDonBanHang with an existing ID
        hoaDonBanHang.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHoaDonBanHangMockMvc.perform(post("/api/hoa-don-ban-hangs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHang)))
            .andExpect(status().isBadRequest());

        // Validate the HoaDonBanHang in the database
        List<HoaDonBanHang> hoaDonBanHangList = hoaDonBanHangRepository.findAll();
        assertThat(hoaDonBanHangList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHoaDonBanHangs() throws Exception {
        // Initialize the database
        hoaDonBanHangRepository.saveAndFlush(hoaDonBanHang);

        // Get all the hoaDonBanHangList
        restHoaDonBanHangMockMvc.perform(get("/api/hoa-don-ban-hangs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hoaDonBanHang.getId().intValue())))
            .andExpect(jsonPath("$.[*].ngayBan").value(hasItem(DEFAULT_NGAY_BAN.toString())))
            .andExpect(jsonPath("$.[*].tongTienHD").value(hasItem(DEFAULT_TONG_TIEN_HD.toString())));
    }

    @Test
    @Transactional
    public void getHoaDonBanHang() throws Exception {
        // Initialize the database
        hoaDonBanHangRepository.saveAndFlush(hoaDonBanHang);

        // Get the hoaDonBanHang
        restHoaDonBanHangMockMvc.perform(get("/api/hoa-don-ban-hangs/{id}", hoaDonBanHang.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hoaDonBanHang.getId().intValue()))
            .andExpect(jsonPath("$.ngayBan").value(DEFAULT_NGAY_BAN.toString()))
            .andExpect(jsonPath("$.tongTienHD").value(DEFAULT_TONG_TIEN_HD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHoaDonBanHang() throws Exception {
        // Get the hoaDonBanHang
        restHoaDonBanHangMockMvc.perform(get("/api/hoa-don-ban-hangs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHoaDonBanHang() throws Exception {
        // Initialize the database
        hoaDonBanHangRepository.saveAndFlush(hoaDonBanHang);
        int databaseSizeBeforeUpdate = hoaDonBanHangRepository.findAll().size();

        // Update the hoaDonBanHang
        HoaDonBanHang updatedHoaDonBanHang = hoaDonBanHangRepository.findOne(hoaDonBanHang.getId());
        // Disconnect from session so that the updates on updatedHoaDonBanHang are not directly saved in db
        em.detach(updatedHoaDonBanHang);
        updatedHoaDonBanHang
            .ngayBan(UPDATED_NGAY_BAN)
            .tongTienHD(UPDATED_TONG_TIEN_HD);

        restHoaDonBanHangMockMvc.perform(put("/api/hoa-don-ban-hangs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHoaDonBanHang)))
            .andExpect(status().isOk());

        // Validate the HoaDonBanHang in the database
        List<HoaDonBanHang> hoaDonBanHangList = hoaDonBanHangRepository.findAll();
        assertThat(hoaDonBanHangList).hasSize(databaseSizeBeforeUpdate);
        HoaDonBanHang testHoaDonBanHang = hoaDonBanHangList.get(hoaDonBanHangList.size() - 1);
        assertThat(testHoaDonBanHang.getNgayBan()).isEqualTo(UPDATED_NGAY_BAN);
        assertThat(testHoaDonBanHang.getTongTienHD()).isEqualTo(UPDATED_TONG_TIEN_HD);
    }

    @Test
    @Transactional
    public void updateNonExistingHoaDonBanHang() throws Exception {
        int databaseSizeBeforeUpdate = hoaDonBanHangRepository.findAll().size();

        // Create the HoaDonBanHang

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHoaDonBanHangMockMvc.perform(put("/api/hoa-don-ban-hangs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHang)))
            .andExpect(status().isCreated());

        // Validate the HoaDonBanHang in the database
        List<HoaDonBanHang> hoaDonBanHangList = hoaDonBanHangRepository.findAll();
        assertThat(hoaDonBanHangList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHoaDonBanHang() throws Exception {
        // Initialize the database
        hoaDonBanHangRepository.saveAndFlush(hoaDonBanHang);
        int databaseSizeBeforeDelete = hoaDonBanHangRepository.findAll().size();

        // Get the hoaDonBanHang
        restHoaDonBanHangMockMvc.perform(delete("/api/hoa-don-ban-hangs/{id}", hoaDonBanHang.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HoaDonBanHang> hoaDonBanHangList = hoaDonBanHangRepository.findAll();
        assertThat(hoaDonBanHangList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HoaDonBanHang.class);
        HoaDonBanHang hoaDonBanHang1 = new HoaDonBanHang();
        hoaDonBanHang1.setId(1L);
        HoaDonBanHang hoaDonBanHang2 = new HoaDonBanHang();
        hoaDonBanHang2.setId(hoaDonBanHang1.getId());
        assertThat(hoaDonBanHang1).isEqualTo(hoaDonBanHang2);
        hoaDonBanHang2.setId(2L);
        assertThat(hoaDonBanHang1).isNotEqualTo(hoaDonBanHang2);
        hoaDonBanHang1.setId(null);
        assertThat(hoaDonBanHang1).isNotEqualTo(hoaDonBanHang2);
    }
}
