package com.dinogroup.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dinogroup.domain.HoaDonBanHangChiTiet;

import com.dinogroup.repository.HoaDonBanHangChiTietRepository;
import com.dinogroup.service.SanPhamService;
import com.dinogroup.web.rest.errors.BadRequestAlertException;
import com.dinogroup.web.rest.util.HeaderUtil;
import com.dinogroup.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HoaDonBanHangChiTiet.
 */
@RestController
@RequestMapping("/api")
public class HoaDonBanHangChiTietResource {

    private final Logger log = LoggerFactory.getLogger(HoaDonBanHangChiTietResource.class);

    private static final String ENTITY_NAME = "hoaDonBanHangChiTiet";

    private final HoaDonBanHangChiTietRepository hoaDonBanHangChiTietRepository;

    @Autowired
    private SanPhamService sanPhamService;

    public HoaDonBanHangChiTietResource(HoaDonBanHangChiTietRepository hoaDonBanHangChiTietRepository) {
        this.hoaDonBanHangChiTietRepository = hoaDonBanHangChiTietRepository;
    }

    /**
     * POST  /hoa-don-ban-hang-chi-tiets : Create a new hoaDonBanHangChiTiet.
     *
     * @param hoaDonBanHangChiTiet the hoaDonBanHangChiTiet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hoaDonBanHangChiTiet, or with status 400 (Bad Request) if the hoaDonBanHangChiTiet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hoa-don-ban-hang-chi-tiets")
    @Timed
    public ResponseEntity<HoaDonBanHangChiTiet> createHoaDonBanHangChiTiet(@Valid @RequestBody HoaDonBanHangChiTiet hoaDonBanHangChiTiet) throws URISyntaxException {
        log.debug("REST request to save HoaDonBanHangChiTiet : {}", hoaDonBanHangChiTiet);
        if (hoaDonBanHangChiTiet.getId() != null) {
            throw new BadRequestAlertException("A new hoaDonBanHangChiTiet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        sanPhamService.updateRemainingMetre(hoaDonBanHangChiTiet);
        HoaDonBanHangChiTiet result = hoaDonBanHangChiTietRepository.save(hoaDonBanHangChiTiet);
        return ResponseEntity.created(new URI("/api/hoa-don-ban-hang-chi-tiets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hoa-don-ban-hang-chi-tiets : Updates an existing hoaDonBanHangChiTiet.
     *
     * @param hoaDonBanHangChiTiet the hoaDonBanHangChiTiet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hoaDonBanHangChiTiet,
     * or with status 400 (Bad Request) if the hoaDonBanHangChiTiet is not valid,
     * or with status 500 (Internal Server Error) if the hoaDonBanHangChiTiet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hoa-don-ban-hang-chi-tiets")
    @Timed
    public ResponseEntity<HoaDonBanHangChiTiet> updateHoaDonBanHangChiTiet(@Valid @RequestBody HoaDonBanHangChiTiet hoaDonBanHangChiTiet) throws URISyntaxException {
        log.debug("REST request to update HoaDonBanHangChiTiet : {}", hoaDonBanHangChiTiet);
        if (hoaDonBanHangChiTiet.getId() == null) {
            return createHoaDonBanHangChiTiet(hoaDonBanHangChiTiet);
        }
        sanPhamService.updateRemainingMetre(hoaDonBanHangChiTiet);
        HoaDonBanHangChiTiet result = hoaDonBanHangChiTietRepository.save(hoaDonBanHangChiTiet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hoaDonBanHangChiTiet.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hoa-don-ban-hang-chi-tiets : get all the hoaDonBanHangChiTiets.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of hoaDonBanHangChiTiets in body
     */
    @GetMapping("/hoa-don-ban-hang-chi-tiets")
    @Timed
    public ResponseEntity<List<HoaDonBanHangChiTiet>> getAllHoaDonBanHangChiTiets(Pageable pageable) {
        log.debug("REST request to get a page of HoaDonBanHangChiTiets");
        Page<HoaDonBanHangChiTiet> page = hoaDonBanHangChiTietRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/hoa-don-ban-hang-chi-tiets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /hoa-don-ban-hang-chi-tiets/:id : get the "id" hoaDonBanHangChiTiet.
     *
     * @param id the id of the hoaDonBanHangChiTiet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hoaDonBanHangChiTiet, or with status 404 (Not Found)
     */
    @GetMapping("/hoa-don-ban-hang-chi-tiets/{id}")
    @Timed
    public ResponseEntity<HoaDonBanHangChiTiet> getHoaDonBanHangChiTiet(@PathVariable Long id) {
        log.debug("REST request to get HoaDonBanHangChiTiet : {}", id);
        HoaDonBanHangChiTiet hoaDonBanHangChiTiet = hoaDonBanHangChiTietRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hoaDonBanHangChiTiet));
    }

    /**
     * DELETE  /hoa-don-ban-hang-chi-tiets/:id : delete the "id" hoaDonBanHangChiTiet.
     *
     * @param id the id of the hoaDonBanHangChiTiet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hoa-don-ban-hang-chi-tiets/{id}")
    @Timed
    public ResponseEntity<Void> deleteHoaDonBanHangChiTiet(@PathVariable Long id) {
        log.debug("REST request to delete HoaDonBanHangChiTiet : {}", id);
        hoaDonBanHangChiTietRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
