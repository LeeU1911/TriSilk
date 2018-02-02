package com.dinogroup.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dinogroup.domain.SanPham;

import com.dinogroup.repository.SanPhamRepository;
import com.dinogroup.web.rest.errors.BadRequestAlertException;
import com.dinogroup.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SanPham.
 */
@RestController
@RequestMapping("/api")
public class SanPhamResource {

    private final Logger log = LoggerFactory.getLogger(SanPhamResource.class);

    private static final String ENTITY_NAME = "sanPham";

    private final SanPhamRepository sanPhamRepository;

    public SanPhamResource(SanPhamRepository sanPhamRepository) {
        this.sanPhamRepository = sanPhamRepository;
    }

    /**
     * POST  /san-phams : Create a new sanPham.
     *
     * @param sanPham the sanPham to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sanPham, or with status 400 (Bad Request) if the sanPham has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/san-phams")
    @Timed
    public ResponseEntity<SanPham> createSanPham(@RequestBody SanPham sanPham) throws URISyntaxException {
        log.debug("REST request to save SanPham : {}", sanPham);
        if (sanPham.getId() != null) {
            throw new BadRequestAlertException("A new sanPham cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SanPham result = sanPhamRepository.save(sanPham);
        return ResponseEntity.created(new URI("/api/san-phams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /san-phams : Updates an existing sanPham.
     *
     * @param sanPham the sanPham to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sanPham,
     * or with status 400 (Bad Request) if the sanPham is not valid,
     * or with status 500 (Internal Server Error) if the sanPham couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/san-phams")
    @Timed
    public ResponseEntity<SanPham> updateSanPham(@RequestBody SanPham sanPham) throws URISyntaxException {
        log.debug("REST request to update SanPham : {}", sanPham);
        if (sanPham.getId() == null) {
            return createSanPham(sanPham);
        }
        SanPham result = sanPhamRepository.save(sanPham);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sanPham.getId().toString()))
            .body(result);
    }

    /**
     * GET  /san-phams : get all the sanPhams.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sanPhams in body
     */
    @GetMapping("/san-phams")
    @Timed
    public List<SanPham> getAllSanPhams() {
        log.debug("REST request to get all SanPhams");
        return sanPhamRepository.findAll();
        }

    /**
     * GET  /san-phams/:id : get the "id" sanPham.
     *
     * @param id the id of the sanPham to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sanPham, or with status 404 (Not Found)
     */
    @GetMapping("/san-phams/{id}")
    @Timed
    public ResponseEntity<SanPham> getSanPham(@PathVariable Long id) {
        log.debug("REST request to get SanPham : {}", id);
        SanPham sanPham = sanPhamRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sanPham));
    }

    /**
     * DELETE  /san-phams/:id : delete the "id" sanPham.
     *
     * @param id the id of the sanPham to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/san-phams/{id}")
    @Timed
    public ResponseEntity<Void> deleteSanPham(@PathVariable Long id) {
        log.debug("REST request to delete SanPham : {}", id);
        sanPhamRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
